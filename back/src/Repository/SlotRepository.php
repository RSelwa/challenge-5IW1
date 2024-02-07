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
    
    // Méthode pour trouver un créneau par rapport au startTime et à la durée
    public function findSlotByTime($startTime, $endTime, $service)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.service = :service')
            ->andWhere('(s.startTime + (s.duration * 60)) >= :startTime') // Vérifie si la fin du créneau est après ou au moment où startTime commence
            ->orWhere('s.startTime >= :startTime')
            ->andWhere('s.startTime <= :endTime')
            ->setParameter('service', $service)
            ->setParameter('startTime', $startTime)
            ->setParameter('endTime', $endTime)
            ->getQuery()
            ->getResult();
    }

    public function findSlotByUserAndEmployee($user, $employee, $now): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.user = :user')
            ->andWhere('s.employee = :employee')
            ->andWhere('s.status = VALIDATED')
            ->andWhere('s.startTime < :now')
            ->setParameter('user', $user)
            ->setParameter('employee', $employee)
            ->setParameter('now', $now)
            ->getQuery()
            ->getResult()
        ;
    }
}