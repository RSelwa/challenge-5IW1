<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240123223827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE employee_specific_schedule ADD start_time_morning VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD end_time_morning VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD start_time_afternoon VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD end_time_afternoon VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP start_time');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP end_time');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD start_time VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule ADD end_time VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP start_time_morning');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP end_time_morning');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP start_time_afternoon');
        $this->addSql('ALTER TABLE employee_specific_schedule DROP end_time_afternoon');
    }
}
