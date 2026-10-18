---
name: revisar-cambios
description: Revisa cambios de código en FocusDesk antes de un commit, sin modificar archivos ni ejecutar operaciones de escritura en Git.
---

# Revisar cambios de FocusDesk

Usa esta Skill cuando se solicite revisar el estado o los cambios del proyecto FocusDesk antes de realizar un commit.

## Procedimiento

1. Comprueba la rama actual y el estado del repositorio con comandos de solo lectura, como `git branch --show-current` y `git status --short`.
2. Inspecciona los cambios no preparados con `git diff`.
3. Si existen cambios preparados, inspecciónalos también con `git diff --cached`.
4. Revisa los archivos y el contexto suficiente para detectar errores evidentes, regresiones, problemas de coherencia o incumplimientos de las instrucciones de `AGENTS.md`.
5. Recomienda pruebas manuales concretas y relevantes para los cambios encontrados.
6. Presenta un informe breve que incluya:
   - rama actual y estado de Git;
   - archivos revisados;
   - hallazgos, indicando cuando no se detectaron problemas evidentes;
   - pruebas manuales recomendadas.

## Límites

- No modifiques ningún archivo del proyecto.
- No ejecutes acciones destructivas.
- No ejecutes `git add`, `git commit`, `git push`, `git merge` ni otras operaciones que cambien el historial o el índice.
- Si no hay cambios, indícalo claramente y explica que no hay diff que revisar.
