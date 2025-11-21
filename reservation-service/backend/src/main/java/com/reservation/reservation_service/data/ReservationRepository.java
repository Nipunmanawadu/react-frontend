package com.reservation.reservation_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>
{
    // getting resevation  a customer
    List<Reservation> findByCustomerId(Long customerId);
}