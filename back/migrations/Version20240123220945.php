<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240123220945 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employee_week_schedule (id UUID NOT NULL, employee_id UUID NOT NULL, start_time_morning VARCHAR(255) DEFAULT NULL, end_time_morning VARCHAR(255) DEFAULT NULL, start_time_afternoon VARCHAR(255) DEFAULT NULL, end_time_afternoon VARCHAR(255) DEFAULT NULL, day INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9485D6358C03F15C ON employee_week_schedule (employee_id)');
        $this->addSql('ALTER TABLE employee_week_schedule ADD CONSTRAINT FK_9485D6358C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee ALTER service_id SET NOT NULL');
        $this->addSql('ALTER TABLE slot ADD duration VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE slot DROP date');
        $this->addSql('ALTER TABLE slot DROP end_time');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employee_week_schedule DROP CONSTRAINT FK_9485D6358C03F15C');
        $this->addSql('DROP TABLE employee_week_schedule');
        $this->addSql('ALTER TABLE employee ALTER service_id DROP NOT NULL');
        $this->addSql('ALTER TABLE slot ADD end_time VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE slot RENAME COLUMN duration TO date');
    }
}
