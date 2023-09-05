# TypeORM

## マイグレーションファイルの生成
```
npm run typeorm migration:generate -- --dataSource src/data-source.ts --pretty src/migration/InitialSchema
```

## マイグレーション実行
```
npm run typeorm migration:run -- --dataSource src/data-source.ts 
```