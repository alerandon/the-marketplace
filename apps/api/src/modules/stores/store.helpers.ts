import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';

/**
 * Aplica búsqueda fuzzy a un query builder de tiendas
 * Combina múltiples estrategias: ILIKE, similarity y word_similarity
 * @param queryBuilder - Query builder de TypeORM
 * @param searchTerm - Término de búsqueda
 * @param columnName - Nombre de la columna a buscar (ej: 'store.name')
 */
export function applyFuzzySearch<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  searchTerm: string,
  columnName: string,
): void {
  queryBuilder.where(
    `(
      unaccent(${columnName}) ILIKE unaccent(:name)
      OR similarity(unaccent(${columnName}), unaccent(:search)) > 0.25
      OR word_similarity(unaccent(:search), unaccent(${columnName})) > 0.25
    )`,
    { name: `%${searchTerm}%`, search: searchTerm }
  );

  queryBuilder.orderBy(
    `
    CASE
      WHEN unaccent(${columnName}) ILIKE unaccent(:exactMatch) THEN 0
      ELSE 1
    END,
    GREATEST(
      similarity(unaccent(${columnName}), unaccent(:search)),
      word_similarity(unaccent(:search), unaccent(${columnName}))
    )
  `,
    'DESC'
  );

  queryBuilder.setParameter('exactMatch', `${searchTerm}%`);
  queryBuilder.setParameter('search', searchTerm);
}

/**
 * Aplica búsqueda fuzzy usando andWhere para combinar con otras condiciones
 * @param queryBuilder - Query builder de TypeORM
 * @param searchTerm - Término de búsqueda
 * @param columnName - Nombre de la columna a buscar (ej: 'product.name')
 */
export function applyFuzzySearchAnd<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  searchTerm: string,
  columnName: string,
): void {
  queryBuilder.andWhere(
    `(
      unaccent(${columnName}) ILIKE unaccent(:name)
      OR similarity(unaccent(${columnName}), unaccent(:search)) > 0.2
      OR word_similarity(unaccent(:search), unaccent(${columnName})) > 0.2
    )`,
    { name: `%${searchTerm}%`, search: searchTerm }
  );

  queryBuilder.addOrderBy(
    `
    CASE
      WHEN unaccent(${columnName}) ILIKE unaccent(:exactMatch) THEN 0
      ELSE 1
    END
  `
  );

  queryBuilder.addOrderBy(
    `
    GREATEST(
      similarity(unaccent(${columnName}), unaccent(:search)),
      word_similarity(unaccent(:search), unaccent(${columnName}))
    )
  `,
    'DESC'
  );

  queryBuilder.setParameter('exactMatch', `${searchTerm}%`);
  queryBuilder.setParameter('search', searchTerm);
}
