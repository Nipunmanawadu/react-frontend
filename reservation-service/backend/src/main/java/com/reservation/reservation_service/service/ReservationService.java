package com.reservation.reservation_service.service;

import com.reservation.reservation_service.data.Reservation;
import com.reservation.reservation_service.data.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservationService
{

    @Autowired
    private ReservationRepository repository;

    public Reservation createReservation(Reservation reservation)
    {
        reservation.setStatus("Confirmed");
        return repository.save(reservation);
    }

    public List<Reservation> getReservationsByCustomer(Long customerId)
    {
        return repository.findByCustomerId(customerId);
    }

    public Reservation updateReservation(Long id, Reservation newData)
    {
        Reservation existing = repository.findById(id).orElse(null);
        if (existing != null)
        {
            existing.setReservationDate(newData.getReservationDate());
            existing.setDurationDays(newData.getDurationDays());
            return repository.save(existing);
        }
        return null;
    }

    public void deleteReservation(Long id)
    {
        repository.deleteById(id);
    }
}