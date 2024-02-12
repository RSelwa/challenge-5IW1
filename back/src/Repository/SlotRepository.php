<?php

namespace App\Repository;

use App\Entity\Slot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Slot>
 *
 * @method Slot|null find($id, $lockMode = null, $lockVersion = null)
 * @method Slot|null findOneBy(array $criteria, array $orderBy = null)
 * @method Slot[]    findAll()
 * @method Slot[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SlotRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Slot::class);
    }
    
    public function findByTime($startTime, $endTime, $service, $id)
    {
        $qb = $this->createQueryBuilder('s');
        
        return $qb
            ->andWhere('s.id != :id')
            ->andWhere('s.service = :service')
            ->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->andX(
                        $qb->expr()->lte('s.startTime', ':startTime'),
                        $qb->expr()->gte('(s.startTime + (s.duration * 60))', ':startTime')
                    ),
                    $qb->expr()->andX(
                        $qb->expr()->gte('s.startTime', ':startTime'),
                        $qb->expr()->lte('s.startTime', ':endTime'),
                    )
                )
            )
            ->setParameter('service', $service)
            ->setParameter('startTime', $startTime)
            ->setParameter('endTime', $endTime)
            ->setParameter('id', $id)
            ->getQuery()
            ->getResult();
    }

    public function findByUserAndEmployee($user, $employee, $now): array
    {
        return $this->createQueryBuilder('s')
            ->innerJoin('s.service', 'service')
            ->andWhere('s.user = :user')
            ->andWhere('service.employee = :employee')
            ->andWhere('s.startTime < :now')
            ->setParameter('user', $user)
            ->setParameter('employee', $employee)
            ->setParameter('now', $now)
            ->getQuery()
            ->getResult()
        ;
    }
}