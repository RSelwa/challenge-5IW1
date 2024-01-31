<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240131222556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT fk_ac0e20678c03f15c');
        $this->addSql('DROP INDEX idx_ac0e20678c03f15c');
        $this->addSql('ALTER TABLE slot ADD service_id UUID NOT NULL');
        $this->addSql('ALTER TABLE slot DROP employee_id');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E2067ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_AC0E2067ED5CA9E6 ON slot (service_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E2067ED5CA9E6');
        $this->addSql('DROP INDEX IDX_AC0E2067ED5CA9E6');
        $this->addSql('ALTER TABLE slot ADD employee_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE slot DROP service_id');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT fk_ac0e20678c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_ac0e20678c03f15c ON slot (employee_id)');
    }
}
