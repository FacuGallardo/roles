import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ReferenteService } from './referente.service';
import { CreateReferenteDto } from './dto/create-referente.dto';
import { UpdateReferenteDto } from './dto/update-referente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('referentes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReferenteController {
  constructor(private readonly referenteService: ReferenteService) {}

  @Post()
  @Roles(Role.PRESIDENTA, Role.TESORERO)
  create(@Body() createReferenteDto: CreateReferenteDto) {
    return this.referenteService.create(createReferenteDto);
  }

  @Get()
  findAll() {
    return this.referenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.referenteService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.PRESIDENTA, Role.TESORERO)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReferenteDto: UpdateReferenteDto) {
    return this.referenteService.update(id, updateReferenteDto);
  }

  @Delete(':id')
  @Roles(Role.PRESIDENTA)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.referenteService.remove(id);
  }

  // --- Nuevo Endpoint: Cambiar Contraseña ---
  // Uso: PATCH /referentes/change-password
  // Body: { "id": 1, "newPassword": "miNuevaPassword" }
  @Patch('auth/change-password') 
  async changePassword(@Body() body: { id: number, newPassword: string }) {
    return this.referenteService.changePassword(body.id, body.newPassword);
  }
}