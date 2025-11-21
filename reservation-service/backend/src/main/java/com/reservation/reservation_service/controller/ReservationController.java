package com.reservation.reservation_service.controller;

import com.reservation.reservation_service.data.Reservation;
import com.reservation.reservation_service.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController
{

    @Autowired
    private ReservationService service;

    @PostMapping("/add")
    public Reservation add(@RequestBody Reservation reservation)
    {
        return service.createReservation(reservation);
    }

    @GetMapping("/customer/{customerId}")
    public List<Reservation> getUserReservations(@PathVariable Long customerId)
    {
        return service.getReservationsByCustomer(customerId);
    }

    @PutMapping("/update/{id}")
    public Reservation update(@PathVariable Long id, @RequestBody Reservation reservation)
    {
        return service.updateReservation(id, reservation);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id)
    {
        service.deleteReservation(id);
    }
}