<?php

namespace App\Repository;

use App\Entity\EmployeeSpecificSchedule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EmployeeSpecificSchedule>
 *
 * @method EmployeeSpecificSchedule|null find($id, $lockMode = null, $lockVersion = null)
 * @method EmployeeSpecificSchedule|null findOneBy(array $criteria, array $orderBy = null)
 * @method EmployeeSpecificSchedule[]    findAll()
 * @method EmployeeSpecificSchedule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EmployeeSpecificScheduleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EmployeeSpecificSchedule::class);
    }

//    /**
//     * @return EmployeeSpecificSchedule[] Returns an array of EmployeeSpecificSchedule objects
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

//    public function findOneBySomeField($value): ?EmployeeSpecificSchedule
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
