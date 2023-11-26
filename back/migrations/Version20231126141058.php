<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231126141058 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT fk_e00ceddea76ed395');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT fk_e00cedde8c03f15c');
        $this->addSql('DROP TABLE booking');
        $this->addSql('ALTER TABLE slot ADD user_id UUID NOT NULL');
        $this->addSql('ALTER TABLE slot ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E2067A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_AC0E2067A76ED395 ON slot (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE booking (id UUID NOT NULL, user_id UUID NOT NULL, employee_id UUID DEFAULT NULL, status VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_e00cedde8c03f15c ON booking (employee_id)');
        $this->addSql('CREATE INDEX idx_e00ceddea76ed395 ON booking (user_id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT fk_e00ceddea76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT fk_e00cedde8c03f15c FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E2067A76ED395');
        $this->addSql('DROP INDEX IDX_AC0E2067A76ED395');
        $this->addSql('ALTER TABLE slot DROP user_id');
        $this->addSql('ALTER TABLE slot DROP status');
    }
}
