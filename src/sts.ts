import { createHmac } from 'crypto';
import axios from 'axios';

interface Options {
  secretId: string;
  secretKey: string;
  proxy?: string;
  host?: string;
  region?: string;
  durationSeconds?: number;
  durationInSeconds?: number;
  policy?: object;
  endpoint?: string;
  action?: string;
  roleArn?: string;
}

interface ScopeItem {
  action?: string;
  bucket?: string;
  region?: string;
  prefix?: string;
}

const StsUrl = 'https://{host}/';

const util = {
  // 获取随机数
  getRandom(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  },

  // obj 转 query string
  json2str(obj: object, $notEncode?: boolean) {
    const arr: string[] = [];
    Object.keys(obj)
      .sort()
      .forEach(function (item) {
        const val = obj[item] || '';
        arr.push(`${item}=${$notEncode ? encodeURIComponent(val) : val}`);
      });
    return arr.join('&');
  },

  // 计算签名
  getSignature(opt: object, key: string, method: string, stsDomain: string) {
    const formatString = `${method}${stsDomain}/?${this.json2str(opt)}`;
    const hmac = createHmac('sha1', key);
    const sign = hmac
      .update(Buffer.from(formatString, 'utf8'))
      .digest('base64');
    return sign;
  },

  // 兼容处理
  backwardCompat(data: any) {
    const compat: any = {};
    for (const key in data) {
      if (typeof data[key] === 'object') {
        compat[this.lowerFirstLetter(key)] = this.backwardCompat(data[key]);
      } else if (key === 'Token') {
        compat['sessionToken'] = data[key];
      } else {
        compat[this.lowerFirstLetter(key)] = data[key];
      }
    }
    return compat;
  },

  lowerFirstLetter(source: string) {
    return source.charAt(0).toLowerCase() + source.slice(1);
  },
};

// 拼接获取临时密钥的参数
const _getCredential = async (options: Options) => {
  if (options.durationInSeconds !== undefined) {
    console.warn(
      'warning: durationInSeconds has been deprecated, Please use durationSeconds ).'
    );
  }

  const secretId = options.secretId;
  const secretKey = options.secretKey;
  const proxy = options.proxy || '';
  const host = options.host || '';
  const region = options.region || 'ap-beijing';
  const durationSeconds =
    options.durationSeconds || options.durationInSeconds || 1800;
  const policy = options.policy;
  const endpoint =
    options.host || options.endpoint || 'sts.tencentcloudapi.com';

  const policyStr = JSON.stringify(policy);
  const action = options.action || 'GetFederationToken'; // 默认GetFederationToken
  const nonce = util.getRandom(10000, 20000);
  const date = Date.now();
  const timestamp = parseInt(`${+date / 1000}`);
  const method = 'POST';
  const name = 'cos-sts-nodejs'; // 临时会话名称

  const params = {
    SecretId: secretId,
    Timestamp: timestamp,
    Nonce: nonce,
    Action: action,
    DurationSeconds: durationSeconds,
    Version: '2018-08-13',
    Region: region,
    Policy: encodeURIComponent(policyStr),
    Signature: '',
    RoleSessionName: '',
    RoleArn: '',
    Name: '',
  };
  if (action === 'AssumeRole') {
    params.RoleSessionName = name;
    params.RoleArn = options.roleArn;
  } else {
    params.Name = name;
  }
  params.Signature = util.getSignature(params, secretKey, method, endpoint);
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  try {
    const response = await axios.post(
      StsUrl.replace('{host}', endpoint),
      formData,
      {
        headers: {
          Host: endpoint,
        },
      }
    );

    const { data } = response;
    const { Response } = data || {};
    if (Response) {
      Response.startTime = Response.ExpiredTime - durationSeconds;
      return util.backwardCompat(Response);
    } else {
      throw new Error('Empty response');
    }
  } catch (error) {
    throw error;
  }
};

// 获取联合身份临时访问凭证
const getCredential = async (opt: Options) => {
  opt.action = 'GetFederationToken';
  return _getCredential(opt);
};

// 申请扮演角色
const getRoleCredential = (opt: Options) => {
  Object.assign(opt, { action: 'AssumeRole' });
  return _getCredential(opt);
};

const getPolicy = (scope: ScopeItem[]) => {
  const statement = scope.map(function (item) {
    const action = item.action || '';
    const bucket = item.bucket || '';
    const region = item.region || '';
    const shortBucketName = bucket.substr(0, bucket.lastIndexOf('-'));
    const appId = bucket.substr(1 + bucket.lastIndexOf('-'));
    const prefix = item.prefix;
    let resource =
      'qcs::cos:' +
      region +
      ':uid/' +
      appId +
      ':prefix//' +
      appId +
      '/' +
      shortBucketName +
      '/' +
      prefix;
    if (action === 'name/cos:GetService') {
      resource = '*';
    }
    return {
      action: action,
      effect: 'allow',
      principal: { qcs: '*' },
      resource: resource,
    };
  });
  return { version: '2.0', statement: statement };
};

const cosStsSdk = {
  getCredential,
  getRoleCredential,
  getPolicy,
};

export default cosStsSdk;
