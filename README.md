# 📦 codex-shared-utils

> **Centralized Shared Library for Codex Microservices**  

---

[![npm version](https://img.shields.io/npm/v/codex-shared-utils?color=blue&logo=npm)](https://www.npmjs.com/package/@akashcapro/codex-shared-utils)
[![npm downloads](https://img.shields.io/npm/dm/codex-shared-utils?color=orange)](https://www.npmjs.com/package/@akashcapro/codex-shared-utils)
[![License](https://img.shields.io/github/license/your-username/codex-shared-utils)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/codex-shared-utils/ci.yml?branch=main&logo=github)](https://github.com/akashcapro/@akashcapro/codex-shared-utils/actions)

---

## 🚀 Overview

`codex-shared-utils` is the **shared utility library** for the **Codex** microservice ecosystem.  
It bundles **protocol buffers**, logging utilities, response models, type declarations, and status mappers into a **single, version-controlled package** — published and consumed via **NPM**.

By centralizing these common modules, we ensure **consistency**, **maintainability**, and **faster development** across all Codex services.

---

## 📂 Features

- **📝 Protobuf Support**
  - All compiled `.proto` files
  - Raw `.proto` definitions for cross-service gRPC communication
- **🪵 Logger**
  - Preconfigured and consistent logging utility across services
- **📡 Response Models**
  - Common HTTP and gRPC response structures
- **🔗 Status Mappers**
  - HTTP ↔ gRPC status mapping helpers
- **🛠 Custom Declarations**
  - Express request type augmentation
  - Custom token payload interface
- **📦 NPM Integration**
  - Actively maintained and published to **npm** for easy integration into all services

---

## 📦 Installation

Install from **npm**:

```bash

npm install @akashcapro/codex-shared-utils