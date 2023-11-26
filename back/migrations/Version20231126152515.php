<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231126152515 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE employee ADD service_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5D9F75A1ED5CA9E6 ON employee (service_id)');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT fk_dbefb1eeed5ca9e6');
        $this->addSql('DROP INDEX idx_dbefb1eeed5ca9e6');
        $this->addSql('ALTER TABLE establishment DROP service_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A1ED5CA9E6');
        $this->addSql('DROP INDEX UNIQ_5D9F75A1ED5CA9E6');
        $this->addSql('ALTER TABLE employee DROP service_id');
        $this->addSql('ALTER TABLE establishment ADD service_id UUID NOT NULL');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT fk_dbefb1eeed5ca9e6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_dbefb1eeed5ca9e6 ON establishment (service_id)');
    }
}
