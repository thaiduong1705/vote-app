# Task 18: Production Build & Deployment Prep

**Files:**

- Create: `server/Dockerfile`
- Create: `client/Dockerfile`
- Create: `docker-compose.yml`
- Modify: `server/package.json`
- Modify: `client/package.json`

**Step 1: Add production scripts**

Modify `server/package.json`:

```json
{
	"scripts": {
		"build": "nest build",
		"start:dev": "nest start --watch",
		"start:prod": "node dist/src/main",
		"start:worker": "tsx --watch src/workers/main.worker.ts",
		"start:worker:prod": "node dist/src/workers/main.worker"
	}
}
```

**Step 2: Create server Dockerfile**

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**Step 3: Create client Dockerfile**

Create `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Step 4: Create docker-compose**

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: voteapp
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vote_app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  valkey:
    image: valkey/valkey:latest
    ports:
      - "6379:6379"

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://voteapp:password@postgres:5432/vote_app
      REDIS_HOST: valkey
      REDIS_PORT: 6379
    depends_on:
      - postgres
      - valkey

  worker:
    build: ./server
    command: npm run start:worker:prod
    environment:
      DATABASE_URL: postgresql://voteapp:password@postgres:5432/vote_app
      REDIS_HOST: valkey
      REDIS_PORT: 6379
    depends_on:
      - postgres
      - valkey

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

**Step 5: Test production build**

```bash
docker-compose up --build
```

Expected: All services start successfully.

**Step 6: Create .dockerignore files**

Create `server/.dockerignore`:

```
node_modules
dist
.env
```

Create `client/.dockerignore`:

```
node_modules
dist
.env
```

**Step 7: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore server/package.json
git commit -m "feat: add Docker support and production build"
```
