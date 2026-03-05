# Udacity Image Processing API

An Express + TypeScript API that resizes local images using `sharp`.

## Project Objective

Build an endpoint that accepts an image name plus width/height, then returns a resized image.
Processed images are cached in `images/thumbimgs` to avoid reprocessing the same size.

## Tech Stack

- Node.js
- TypeScript
- FileSystem
- Express
- Sharp
- Jasmine + Supertest
- ESLint + Prettier

## Prerequisites

- Node.js (LTS recommended)
- npm

## Installation

```bash
npm install
```

## Scripts

- `npm run build` -> Compile TypeScript to `build/`
- `npm start` -> Build then run production server on port `3000`
- `npm test` -> Run Jasmine test suite
- `npm run lint` -> Run ESLint on TypeScript files
- `npm run format` -> Format TypeScript files (`source/**/*.ts`)

## API Documentation

### Endpoint

`GET /api/images`

### Query Parameters

- `filename` (required): image name without extension.
- `width` (required): positive number.
- `height` (required): positive number.

### Available Filenames

Use one of the files in `images/fullimgs` (without `.jpg`):

- `encenadaport`
- `fjord`
- `icelandwaterfall`
- `palmtunnel`
- `santamonica`

### Example Request

```bash
http://localhost:3000/api/images?filename=fjord&width=300&height=300
```

### Success Response

- `200 OK`
- Returns the resized JPG image.
- On first request, the image is generated and saved under:
  `images/thumbimgs/<filename>_<width>_<height>.jpg`
- On repeated requests with same params, cached image is returned.

### Error Responses

- `400` -> `Filename is required`
- `404` -> `File not found`
- `400` -> `Width is required`
- `400` -> `Invalid width value (must be a positive number)`
- `400` -> `Height is required`
- `400` -> `Invalid height value (must be a positive number)`

## Build, Test, and Run (Submission Flow)

1. Install dependencies:

```bash
npm install
```

2. Compile project:

```bash
npm run build
```

3. Run formatter:

```bash
npm run format
```

4. Run linter:

```bash
npm run lint
```

5. Run tests with jasmine:

```bash
npm test
```

6. Start production server:

```bash
npm start
```

7. Verify endpoint in browser:

```bash
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```
