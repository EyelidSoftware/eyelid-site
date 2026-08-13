# Espelha o padrão do frontend do AutoFeedr: build em node, serve em nginx.
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
# O build busca os preços na API pública do AutoFeedr. Se ela estiver fora,
# src/lib/plans.ts cai no fallback e avisa no log — não quebra o build.
RUN npm run build

FROM nginx:1.27-alpine AS prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
