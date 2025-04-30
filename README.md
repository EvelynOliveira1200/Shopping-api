# 🛍️ Shopping de Cosméticos - API REST

Esta é uma API RESTful para gerenciamento de um sistema de e-commerce de cosméticos. A API permite cadastrar, listar, atualizar e excluir cosméticos e marcas, utilizando autenticação por `x-api-key`.

---

## 🚀 Endpoints Principais

### 💄 Cosmetics

#### 🔹 GET `/api/cosmetics`
Retorna todos os cosméticos cadastrados.

#### 🔹 GET `/api/cosmetics/{id}`
Busca um cosmético específico por ID.

#### 🔹 POST `/api/cosmetics`
Cria um novo cosmético.  
**Campos obrigatórios:** `nome`, `brand_id`, `categoria`, `price_cosmetic`, `quantidade_disponivel`, `photo`

#### 🔹 PUT `/api/cosmetics/{id}`
Atualiza um ou mais campos de um cosmético existente.

#### 🔹 DELETE `/api/cosmetics/{id}`
Remove um cosmético com base no ID.

---

### 🏷️ Brands

#### 🔹 GET `/api/brands`
Lista todas as marcas cadastradas.

#### 🔹 GET `/api/brands/{id}`
Busca uma marca específica por ID.

#### 🔹 POST `/api/brands`
Cria uma nova marca.  
**Campos obrigatórios:** `nome`, `pais_origem`

#### 🔹 PUT `/api/brands/{id}`
Atualiza informações de uma marca existente.

#### 🔹 DELETE `/api/brands/{id}`
Remove uma marca pelo ID.