import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { PassportLocalGuard } from '../guards/passport-local.guard';
import { PassportJwtAuthGuard } from '../guards/passport-jwt.guard';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';

// 🧩 Importaciones Swagger
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('autenticación') // Agrupa estos endpoints bajo "autenticación" en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 🔐 Inicio de sesión con credenciales locales (usuario y contraseña)
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Permite al usuario autenticarse con sus credenciales. Devuelve un token JWT si las credenciales son válidas.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@correo.com' },
        password: { type: 'string', example: 'MiContraseña123' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso. Retorna un token JWT.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas o usuario no encontrado.',
  })
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  /**
   * 👤 Obtiene la información del usuario autenticado (requiere JWT)
   */
  @UseGuards(PassportJwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('access-token') // Indica que necesita JWT
  @ApiOperation({
    summary: 'Obtener usuario autenticado',
    description:
      'Devuelve la información del usuario asociada al token JWT enviado en el encabezado Authorization.',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos del usuario autenticado.',
    schema: {
      example: {
        id: 1,
        email: 'usuario@correo.com',
        nombre: 'Juan Pérez',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o no proporcionado.',
  })
  getUserInfo(@Request() request: any) {
    return request.user;
  }

  /**
   * 🆕 Registro de nuevos usuarios
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description:
      'Crea un nuevo usuario en el sistema y devuelve su información básica.',
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      ejemplo1: {
        summary: 'Datos de registro válidos',
        value: {
          "email": "usuario20@example.com",
          "password": "p2",
          "id_rol": 2,
          "name": "Benito",
          "lastname": "Martinez",
          "phone_number": "3158695326"
        }
      },
    },
  })
@ApiResponse({
  status: 201,
  description: 'Usuario creado correctamente.',
  schema: {
    example: {
      id: 12,
      email: 'nuevo@correo.com',
      createdAt: '2025-10-16T18:00:00Z',
    },
  },
})
@ApiResponse({
  status: 400,
  description: 'Datos inválidos o usuario ya existente.',
})
async register(@Body() createUserDto: CreateUserDto) {
  return this.authService.signUp(createUserDto);
}
}
