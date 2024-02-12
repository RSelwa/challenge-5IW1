<?php

namespace App\Repository;

use App\Entity\Notations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Notations>
 *
 * @method Notations|null find($id, $lockMode = null, $lockVersion = null)
 * @method Notations|null findOneBy(array $criteria, array $orderBy = null)
 * @method Notations[]    findAll()
 * @method Notations[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NotationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notations::class);
    }

    public function findByUserAndEmployee($user, $employee, $id): array
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.id != :id')
            ->andWhere('n.idNotationFrom = :user')
            ->andWhere('n.idNotationTarget = :employee')
            ->setParameter('user', $user)
            ->setParameter('employee', $employee)
            ->setParameter('id', $id)
            ->getQuery()
            ->getResult()
        ;
    }
}
