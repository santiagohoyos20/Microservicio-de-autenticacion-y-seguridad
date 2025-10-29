# Etapa 1: build
FROM node:20 AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Etapa 2: runtime
FROM node:20

WORKDIR /usr/src/app

# Copia solo los archivos necesarios desde el builder
COPY --from=builder /usr/src/app ./

# Expone el puerto de la app
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "start:dev"]
