
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🧪 Mockly — Fake API Response Generator for Dev Teams

> **Mockly** is a lightweight NestJS-based mock server that generates fake API responses for developers.  
> It helps frontend, mobile, and integration teams test APIs without waiting for backend completion.

---

## 🚀 Features

- ✅ RESTful API built with **NestJS**
- ⚙️ Configurable endpoints for custom mock data
- 📦 Auto-generated Swagger UI for testing
- 💬 Unified response format (`MockResponse` DTO)
- 🧰 Easy to extend and integrate with existing projects
- ⏱️ Simulate delays, timeouts, and random errors
- 🧠 Supports HTTP status mapping (`200`, `201`, `202`, `400`, `404`, ...)

---

## 🏗️ Project Structure

```
src/
 ├── main.ts                  # App entry point
 ├── app.module.ts            # Root module
 ├── common/
 │   └── response.helper.ts    # Utility functions for success/error responses
 ├── config/
 │   └── swagger.ts    # Utility for api documentations
 │   
 ├── modules/
 │   └── mock/
 │       ├── mock.controller.ts     # Example endpoints
 │       ├── mock.service.ts        # Logic for generating mock data
 │       └── mock.module.ts

```

---

## ⚡ Installation

```bash
# 1. Clone this repository
git clone https://github.com/nguyenlyminhman/mockly.git
cd mockly

# 2. Install dependencies
npm install

# 3. Run the server
npm run start:dev
```

Server will start at:  
👉 `http://localhost:3000`

Swagger UI available at:  
👉 `http://localhost:3000/api/docs`

---

## 🧩 Example Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/mock/hello` | Returns a simple test response |
| `POST` | `/mock/timeout` | Simulates delayed response |
| `GET` | `/mock/error` | Returns an error response |
| `GET` | `/mock/users` | Returns a list of fake users |

---

## 🧱 Response Format

All API responses follow a unified structure defined by [`MockResponse`](src/common/dto/mock-response.dto.ts):

```json
{
  "statusCode": 200,
  "message": "OK",
  "payload": {
    "id": 1,
    "name": "John Doe"
  }
}
```

**MockResponse class:**

```ts
export class MockResponse<T = any> {
  statusCode: number;
  message: string;
  payload?: T;
}
```

---

## 🧠 Example Usage in Controller

```ts
@Post('/timeout')
@ApiOkResponse({ type: MockResponse })
async callTimeoutData() {
  const data = await this.mockService.callTimeoutData();
  return MockResponse.success(data, 'Request accepted', HttpStatus.ACCEPTED);
}
```

---

## 🔧 Configuration

You can modify or extend mock endpoints in:

```
src/modules/mock/mock.controller.ts
```

To add new fake data:
- Create new files under `/mocks`
- Import and use them in the mock service

---


Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======
## 💬 Development Tips

- Use `MockResponse.success()` for success responses
- Use `MockResponse.error()` for errors
- Avoid `@Res()` in controllers if you want Swagger to auto-document responses
- Use `@HttpCode()` for setting custom HTTP status

---

## 🧰 Example Helper (`response.helper.ts`)

```ts
export const mockResponse = (status: number, success: boolean, data: any) => ({
  statusCode: status,
  success,
  data,
});
```

---

## 🧑‍💻 Contributors

| Name | Role |
|------|------|
| **Nguyen Ly Minh Man** | 💡 Lead Developer |
| Team Dev | 🔧 Frontend / API Integration |

---

## 📄 License

This project is licensed under the **MIT License**.

---

> 💬 _Mockly — "When real APIs aren’t ready, mock them beautifully."_
