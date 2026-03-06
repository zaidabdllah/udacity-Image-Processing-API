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
- `npm run lint` -> Run ESLint on TypeScript files
- `npm run format` -> Format TypeScript files (`source/**/*.ts`)
- `npm test` -> Run Jasmine test suite
- `npm start` -> Build then run production server on port `3000`

## API Documentation

### Endpoint

`GET /api/images`

### Query Parameters

- `filename` (required): image name from `images/fullimgs`, and it works whether you pass it with or without the original extension.
- `width` (required): positive number, and the maximum allowed value is `5000`.
- `height` (required): positive number, and the maximum allowed value is `5000`.
- `output` (optional): output image format. Supported values are `jpg`, `jpeg`, `png`, and `webp`.

### Example Request

```bash
http://localhost:3000/api/images?filename=fjord&width=300&height=300
```

You can also use `output` to return the processed image in a different format:

```bash
http://localhost:3000/api/images?filename=fjord&width=300&height=300&output=png
```

This is useful when you want to control the returned file type instead of keeping the original image extension.

### Success Response

- `200 OK`
- Returns the resized image with the requested extension.
- If `output` is not provided, the API keeps the original image extension.
- On first request, the image is generated and saved under:
  `images/thumbimgs/<filename>_<width>_<height>.<extension>`
- On repeated requests with the same params, the cached image is returned directly.

### Error Responses

Errors are returned as JSON in this format:

```json
{
  "ok": false,
  "code": "ERROR_CODE",
  "error": "Error message"
}
```

Current error codes:

- `MISSING_FILENAME` -> `filename` was not provided.
- `FILE_NOT_FOUND` -> the requested image does not exist in `images/fullimgs`.
- `MISSING_WIDTH` -> `width` was not provided.
- `INVALID_WIDTH` -> `width` is not a valid positive number.
- `WIDTH_TOO_LARGE` -> `width` is greater than the maximum allowed value.
- `MISSING_HEIGHT` -> `height` was not provided.
- `INVALID_HEIGHT` -> `height` is not a valid positive number.
- `HEIGHT_TOO_LARGE` -> `height` is greater than the maximum allowed value.
- `INVALID_OUTPUT_FORMAT` -> `output` is not one of the supported formats.

## Build, Test, and Run (Submission Flow)

1. Install dependencies:

```bash
npm install
```

2. Run formatter:

```bash
npm run format
```

3. Run linter:

```bash
npm run lint
```

4. Run tests with Jasmine:

```bash
npm test
```

5. Compile project:

```bash
npm run build
```

6. Start production server:

```bash
npm start
```

7. Verify endpoint in browser:

```bash
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

Second example with `output`:

```bash
http://localhost:3000/api/images?filename=fjord&width=200&height=200&output=webp
```

This forces the API to return a processed `webp` image even if the source image uses a different extension.
