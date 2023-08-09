import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardDataDTO } from './app.dto';
import STS from './oss/sts.js';
import { ConfigService } from '@nestjs/config';
export interface OSSTempKey {
  expiredTime: number;
  expiration: Date;
  credentials: Credentials;
  requestId: string;
  startTime: number;
}

export interface Credentials {
  sessionToken: string;
  tmpSecretId: string;
  tmpSecretKey: string;
}
@Controller()
@UseGuards(JwtGuard)
@ApiTags('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get('/dashboard')
  @ApiResponse({ type: DashboardDataDTO })
  @UseGuards(JwtGuard)
  getDashboardData() {
    return this.appService.getDashboardData() as unknown as DashboardDataDTO;
  }
  @Get('/ossKey')
  @UseGuards(JwtGuard)
  public async getOssAuthKey() {
    const ossId = this.configService.get<string>('OSS_ID') ?? '';
    const ossName = this.configService.get<string>('OSS_NAME') ?? '';
    const ossKey = this.configService.get<string>('OSS_KEY') ?? '';
    const ossRegion = this.configService.get<string>('OSS_REGION') ?? '';

    const ossConfig = {
      secretId: ossId, // 固定密钥
      secretKey: ossKey, // 固定密钥
      proxy: '',
      host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
      // endpoint: 'sts.internal.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com
      durationSeconds: 1800, // 密钥有效期
      // 放行判断相关参数
      bucket: ossName, // 换成你的 bucket
      region: ossRegion, // 换成 bucket 所在地区
      allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    };
    const shortBucketName = ossConfig.bucket.substring(
      0,
      ossConfig.bucket.lastIndexOf('-')
    );
    const appId = ossConfig.bucket.substring(
      1 + ossConfig.bucket.lastIndexOf('-')
    );
    const policy = {
      version: '2.0',
      statement: [
        {
          action: [
            // 简单上传
            'name/cos:PutObject',
            'name/cos:PostObject',
            // 分片上传
            'name/cos:InitiateMultipartUpload',
            'name/cos:ListMultipartUploads',
            'name/cos:ListParts',
            'name/cos:UploadPart',
            'name/cos:CompleteMultipartUpload',
          ],
          effect: 'allow',
          principal: { qcs: ['*'] },
          resource: [
            'qcs::cos:' +
              ossConfig.region +
              ':uid/' +
              appId +
              ':prefix//' +
              appId +
              '/' +
              shortBucketName +
              '/' +
              ossConfig.allowPrefix,
          ],
          // condition生效条件，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
          // 'condition': {
          //   // 比如限定ip访问
          //   'ip_equal': {
          //     'qcs:ip': '10.121.2.10/24'
          //   }
          // }
        },
      ],
    };
    const data: OSSTempKey = (await STS.getCredential({
      secretId: ossConfig.secretId,
      secretKey: ossConfig.secretKey,
      proxy: ossConfig.proxy,
      durationSeconds: ossConfig.durationSeconds,
      region: ossConfig.region,
      // endpoint: ossConfig.endpoint,
      policy: policy,
    })) as unknown as OSSTempKey;
    return data;
  }
}
