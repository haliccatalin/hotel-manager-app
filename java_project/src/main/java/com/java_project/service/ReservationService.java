package com.java_project.service;

import com.java_project.model.Reservation;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationService {

    Optional<Reservation> getReservationById(Long id);
    List<Reservation> getAllReservations();
    Reservation saveReservation(Reservation reservation);
    Reservation updateReservation(Reservation reservation);
    void deleteReservationById(Long id);
    List<Reservation> getReservationsByDate(LocalDate date);
}
