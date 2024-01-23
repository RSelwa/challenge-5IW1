<?php

namespace App\Repository;

use App\Entity\EmployeeWeekSchedule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EmployeeWeekSchedule>
 *
 * @method EmployeeWeekSchedule|null find($id, $lockMode = null, $lockVersion = null)
 * @method EmployeeWeekSchedule|null findOneBy(array $criteria, array $orderBy = null)
 * @method EmployeeWeekSchedule[]    findAll()
 * @method EmployeeWeekSchedule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EmployeeWeekScheduleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EmployeeWeekSchedule::class);
    }

//    /**
//     * @return EmployeeWeekSchedule[] Returns an array of EmployeeWeekSchedule objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?EmployeeWeekSchedule
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
