<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240128113142 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE notations_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE notations (id INT NOT NULL, id_notation_target_id UUID NOT NULL, id_notation_from_id UUID NOT NULL, note INT NOT NULL, comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9B69C07CC673C2D7 ON notations (id_notation_target_id)');
        $this->addSql('CREATE INDEX IDX_9B69C07CF1DE2CB1 ON notations (id_notation_from_id)');
        $this->addSql('ALTER TABLE notations ADD CONSTRAINT FK_9B69C07CC673C2D7 FOREIGN KEY (id_notation_target_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notations ADD CONSTRAINT FK_9B69C07CF1DE2CB1 FOREIGN KEY (id_notation_from_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE notations_id_seq CASCADE');
        $this->addSql('ALTER TABLE notations DROP CONSTRAINT FK_9B69C07CC673C2D7');
        $this->addSql('ALTER TABLE notations DROP CONSTRAINT FK_9B69C07CF1DE2CB1');
        $this->addSql('DROP TABLE notations');
    }
}
