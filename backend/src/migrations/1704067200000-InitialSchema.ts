import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1704067200000 implements MigrationInterface {
  name = 'InitialSchema1704067200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`role\` enum('admin', 'editor', 'customer') NOT NULL DEFAULT 'customer',
        \`firstName\` varchar(100) NOT NULL,
        \`lastName\` varchar(100) NOT NULL,
        \`phoneNumber\` varchar(20) NULL,
        \`avatar\` json NULL,
        \`address\` json NULL,
        \`isActive\` tinyint NOT NULL DEFAULT 1,
        \`lastLogin\` timestamp NULL,
        \`passwordChangedAt\` timestamp NULL,
        \`passwordResetToken\` varchar(255) NULL,
        \`passwordResetExpires\` timestamp NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_user_email\` (\`email\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Create categories table
    await queryRunner.query(`
      CREATE TABLE \`categories\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`description\` text NOT NULL,
        \`image\` json NULL,
        \`parentId\` int NULL,
        \`level\` int NOT NULL DEFAULT 0,
        \`order\` int NOT NULL DEFAULT 0,
        \`isActive\` tinyint NOT NULL DEFAULT 1,
        \`metadata\` json NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_category_name\` (\`name\`),
        UNIQUE INDEX \`IDX_category_slug\` (\`slug\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add foreign key for categories self-reference
    await queryRunner.query(`
      ALTER TABLE \`categories\`
      ADD CONSTRAINT \`FK_category_parent\`
      FOREIGN KEY (\`parentId\`) REFERENCES \`categories\`(\`id\`)
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    // Create products table
    await queryRunner.query(`
      CREATE TABLE \`products\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`description\` text NOT NULL,
        \`price\` decimal(10,2) NOT NULL,
        \`images\` json NULL,
        \`categoryId\` int NULL,
        \`specifications\` json NULL,
        \`stock\` int NOT NULL DEFAULT 0,
        \`featured\` tinyint NOT NULL DEFAULT 0,
        \`status\` enum('draft', 'published', 'outOfStock') NOT NULL DEFAULT 'draft',
        \`metadata\` json NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_product_slug\` (\`slug\`),
        FULLTEXT INDEX \`IDX_product_fulltext\` (\`name\`, \`description\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add foreign key for products
    await queryRunner.query(`
      ALTER TABLE \`products\`
      ADD CONSTRAINT \`FK_product_category\`
      FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`)
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    // Create posts table
    await queryRunner.query(`
      CREATE TABLE \`posts\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`title\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`content\` text NOT NULL,
        \`excerpt\` varchar(500) NOT NULL,
        \`featuredImage\` json NULL,
        \`images\` json NULL,
        \`authorId\` int NULL,
        \`categories\` text NOT NULL,
        \`tags\` text NULL,
        \`status\` enum('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
        \`publishedAt\` timestamp NULL,
        \`metadata\` json NULL,
        \`stats\` json NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_post_slug\` (\`slug\`),
        FULLTEXT INDEX \`IDX_post_fulltext\` (\`title\`, \`content\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add foreign key for posts
    await queryRunner.query(`
      ALTER TABLE \`posts\`
      ADD CONSTRAINT \`FK_post_author\`
      FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`)
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    // Create orders table
    await queryRunner.query(`
      CREATE TABLE \`orders\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`orderType\` enum('purchase', 'consultation') NOT NULL,
        \`customer\` json NOT NULL,
        \`consultationDetails\` json NULL,
        \`totalAmount\` decimal(10,2) NOT NULL DEFAULT 0,
        \`status\` enum('pending', 'confirmed', 'processing', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
        \`paymentStatus\` enum('unpaid', 'paid', 'refunded') NOT NULL DEFAULT 'unpaid',
        \`paymentMethod\` enum('cod', 'bank_transfer', 'credit_card') NOT NULL DEFAULT 'cod',
        \`notes\` text NULL,
        \`staffNotes\` text NULL,
        \`assignedStaffId\` int NULL,
        \`statusHistory\` json NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add foreign key for orders
    await queryRunner.query(`
      ALTER TABLE \`orders\`
      ADD CONSTRAINT \`FK_order_staff\`
      FOREIGN KEY (\`assignedStaffId\`) REFERENCES \`users\`(\`id\`)
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    // Create order_items table
    await queryRunner.query(`
      CREATE TABLE \`order_items\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`orderId\` int NOT NULL,
        \`productId\` int NOT NULL,
        \`quantity\` int NOT NULL,
        \`price\` decimal(10,2) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add foreign keys for order_items
    await queryRunner.query(`
      ALTER TABLE \`order_items\`
      ADD CONSTRAINT \`FK_order_item_order\`
      FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`)
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`order_items\`
      ADD CONSTRAINT \`FK_order_item_product\`
      FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`)
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to respect foreign key constraints
    await queryRunner.query(`DROP TABLE \`order_items\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`posts\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
