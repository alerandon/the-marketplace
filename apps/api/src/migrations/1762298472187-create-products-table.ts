import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductsTable1762298472187 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'numeric',
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: 'sku',
                        type: 'varchar',
                        length: '50',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'stock',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'isAvailable',
                        type: 'boolean',
                        default: 'true',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'storeId',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['storeId'],
                referencedTableName: 'stores',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('products');
        const fk = table?.foreignKeys.find((f) => f.columnNames.indexOf('storeId') !== -1);
        if (fk) {
            await queryRunner.dropForeignKey('products', fk);
        }

        await queryRunner.dropTable('products');
    }
}
