package com.java_project.service.impl;


import com.java_project.model.Reservation;
import com.java_project.repository.CustomerRepository;
import com.java_project.repository.ReservationRepository;
import com.java_project.service.ReservationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final CustomerRepository customerRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository, CustomerRepository customerRepository) {
        this.reservationRepository = reservationRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation updateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservationById(Long id) {
     reservationRepository.deleteById(id);
    }

    @Override
    public List<Reservation> getReservationsByDate(LocalDate date) {
        return reservationRepository.getReservationByStartDate(date);
    }
}
