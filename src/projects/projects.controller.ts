import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDTO } from './dto/project.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiResponse({ type: ProjectDTO })
  @UseGuards(JwtGuard)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto) as any as ProjectDTO;
  }

  @Get()
  @ApiResponse({ type: ProjectDTO, isArray: true })
  findAll() {
    return this.projectsService.findAll() as any as ProjectDTO[];
  }

  @Get(':id')
  @ApiResponse({ type: ProjectDTO })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id) as any as ProjectDTO;
  }

  @Patch(':id')
  @ApiResponse({ type: ProjectDTO })
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(
      id,
      updateProjectDto
    ) as any as ProjectDTO;
  }

  @Delete('/batch')
  async deleteBatch(@Body() ids: string[]) {
    return this.projectsService.deleteBatch(ids) as any as { count: number };
  }
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiResponse({ type: ProjectDTO })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id) as any as ProjectDTO;
  }
}
