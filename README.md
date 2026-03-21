# My Work Item

一個前後端分離的工作項目管理 Web 應用程式。

## 專案結構

```
MyWorkItem/
├── MyWorkItemAPI/        ← 後端 (.NET 8 Web API)
└── MyWorkItemFrontend/   ← 前端 (React + Vite + Tailwind CSS)
```

---

## 環境需求

| 工具     | 版本需求  |
| -------- | --------- |
| .NET SDK | 8.0 以上  |
| Node.js  | 18.0 以上 |
| npm      | 8.0 以上  |

---

## 啟動後端（MyWorkItemAPI）

```bash
cd MyWorkItemAPI
dotnet run --project MyWorkItemAPI
```

啟動後可存取：

- API 根路徑：`http://localhost:5237`
- Swagger UI：`http://localhost:5237/swagger`

### API 端點

| Method | 路徑                  | 說明               |
| ------ | --------------------- | ------------------ |
| GET    | `/api/workitems`      | 取得所有 Work Item |
| GET    | `/api/workitems/{id}` | 取得單一 Work Item |
| POST   | `/api/workitems`      | 新增 Work Item     |
| PUT    | `/api/workitems/{id}` | 更新 Work Item     |
| DELETE | `/api/workitems/{id}` | 刪除 Work Item     |

---

## 啟動前端（MyWorkItemFrontend）

首次執行需先安裝依賴：

```bash
cd MyWorkItemFrontend
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

啟動後可存取：

- 前端頁面：`http://localhost:5173`

### 頁面路由

| 路徑        | 說明                       |
| ----------- | -------------------------- |
| `/`         | 工作項目清單（含狀態篩選） |
| `/create`   | 新增工作項目               |
| `/edit/:id` | 編輯工作項目               |

---

## 注意事項

- 請先啟動後端，再啟動前端，確保 API 可正常連線。
- 後端資料儲存於記憶體（In-Memory），重新啟動後資料將重置。
- CORS 設定僅允許 `http://localhost:5173`，若前端 port 不同請調整 `MyWorkItemAPI/Program.cs` 中的 CORS 設定。
