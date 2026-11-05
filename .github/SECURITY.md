# 🛡️ Política de Seguridad & Cyber-Defense

## Versiones Soportadas

| Versión | Soportada | Estado de Parches de Seguridad |
| :--- | :--- | :--- |
| **1.0.x (Actual)** | :white_check_mark: | Actualizaciones activas y parches continuos |

---

## 🔒 Arquitectura de Seguridad Implementada

Este backend implementa defensas multicapa alineadas con el estándar **OWASP Top 10**:

1. **Protección contra Race Conditions en Inventario:**  
   Transacciones ACID `SERIALIZABLE` con `QueryRunner` y bloqueos pesimistas para impedir ventas simultáneas sin stock disponible.
2. **Cifrado de Credenciales:**  
   Contraseñas procesadas mediante derivación segura con `bcryptjs` (salt rounds).
3. **Protección contra Contaminación de Parámetros (HPP):**  
   Middleware `hpp` integrado para prevenir manipulación maliciosa de query strings repetidos.
4. **Cabeceras de Seguridad HTTP:**  
   Configuración estricta con `Helmet` (HSTS, Anti-Clickjacking, XSS Filter).
5. **Rate Limiting Distribuido:**  
   Protección contra ataques de denegación de servicio (DoS) y fuerza bruta con `@nestjs/throttler` y Redis.
