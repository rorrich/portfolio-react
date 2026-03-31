/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // Отключаем проверку camelCase (разрешаем классы вроде arrowItem)
    "selector-class-pattern": null,
    
    // Отключаем проверку "веса" селекторов (чтобы не ругался на порядок правил)
    "no-descending-specificity": null,
    
    // Разрешаем пустые блоки, если внутри есть комментарий (например .default { /* маркер */ })
    "block-no-empty": true,
    
    // Включаем проверку неизвестных псевдоклассов, НО добавляем :global в исключения
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ]
  }
};