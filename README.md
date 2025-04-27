# 🚀 MXRP Bot - Discord Bot Mejorado

Bot de Discord optimizado y moderno construido con las últimas tecnologías y mejores prácticas de desarrollo.

## ⭐ Características Principales

- ⚡ Arquitectura modular y escalable
- 🛡️ Sistema robusto de permisos y seguridad
- 📊 Logging avanzado y monitoreo de rendimiento
- 🔄 Sistema inteligente de cooldown
- 🎯 Soporte completo de TypeScript con JSDoc
- 📦 Gestión eficiente de dependencias con Bun

## 🛠️ Stack Tecnológico

- Discord.js v14.19.1
- ES Modules
- Bun Runtime
- Sistema de logging con Chalk
- CLI mejorada con Ora

## 🔧 Requisitos

- Node.js 18+
- Bun (último release)
- Token de Discord Bot

## 📦 Instalación

```bash
# Instala Bun

(https://bun.sh)[Bun Web]

# Instalar dependencias
bun install

# Crea tu .env y agrega lo siguiente
TOKEN=Tu token

# Iniciar el bot
bun run start
```

## 🎮 Comandos Disponibles

### Moderación
- `/ban` - Sistema avanzado de baneos
- `/kick` - Expulsión de usuarios
- `/strike` - Sistema de advertencias
- `/unstrike` - Remover advertencias

### Utilidad
- `/encuesta` - Sistema de encuestas
- `/ping` - Estado del bot y sistema
- `/borrar` - Limpieza de mensajes

### Staff
- `/contrato` - Gestión de personal
- `/despedir` - Remoción de personal

## 📁 Estructura del Proyecto

```
src/
├── Commands/      # Comandos del bot
├── Events/        # Manejadores de eventos
├── Handlers/      # Core systems
├── Functions/     # Funciones utilitarias
└── Utils/         # Utilidades y helpers
```

## 🔍 Características Técnicas

- Sistema de logging detallado
- Manejo robusto de errores
- Cooldowns por comando
- Permisos granulares
- Eventos optimizados
- Tipado estricto

## 📝 Notas para Desarrolladores

### Áreas de Mejora

1. Modernización del Código
```javascript
// ❌ Evitar require - Código Obsoleto
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

// ✅ Usar ES Modules
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
```

2. Tipado y Documentación
```javascript
// ❌ Sin tipos
async execute(interaction) {

// ✅ Con tipos y documentación
/**
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
async execute(interaction, client) {
```

3. Manejo de Errores
```javascript
// ❌ Manejo básico
} catch (error) {
    console.error(error);
}

// ✅ Manejo robusto
} catch (error) {
    console.error(chalk.red(`[Error @ ${interaction.commandName}]`), error);
    await handleError(interaction, client, error);
}
```

4. Permisos y Seguridad
```javascript
// ❌ Verificación básica
if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers))

// ✅ Usando defaultMemberPermissions
.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
```

### Buenas Prácticas

- Usar ES Modules en lugar de CommonJS
- Implementar tipos y documentación JSDoc
- Manejar errores de forma robusta
- Seguir las convenciones de nombres
- Mantener el código limpio y modular
- Documentar funcionalidades nuevas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Sigue el estilo de código establecido
2. Documenta las nuevas funcionalidades
3. Mantén la compatibilidad con ES Modules
4. Prueba tus cambios antes de enviar PR
