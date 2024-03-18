package com.java_project.controller;


import com.java_project.exception.ResourceNotFoundException;
import com.java_project.model.PaymentStatus;
import com.java_project.model.Reservation;
import com.java_project.service.ReservationService;
import com.java_project.service.impl.ReservationServiceImpl;
import com.java_project.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/reservations")
public class ReservationController {
    public final ReservationServiceImpl reservationService;

    public ReservationController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllReservation() {
        List<Reservation> reservationList = reservationService.getAllReservations();

        return ResponseEntity.ok(ApiResponse.success("Reservations list",reservationList));
    }

    @GetMapping("/reservationById/{id}")
    public ResponseEntity<ApiResponse> getAllReservationsById(@PathVariable Long id) {
        Optional<Reservation> reservationOptional = reservationService.getReservationById(id);
        reservationOptional.orElseThrow(() ->
                new ResourceNotFoundException("The reservation with id: " + id + " doesn't exist in DB"));

        return ResponseEntity.ok(ApiResponse.success("Reservation by id", reservationOptional.get()));
    }

    @GetMapping("/reservationsByDate/{date}")
    public ResponseEntity<ApiResponse> getAllReservationByDate(@PathVariable LocalDate date) {
        List<Reservation> reservationsByDateList = reservationService.getReservationsByDate(date);

        return ResponseEntity.ok(ApiResponse.success("Reservations by date", reservationsByDateList));
    }

    @PostMapping("/addReservation")
    public ResponseEntity<ApiResponse> saveReservation(@RequestBody Reservation reservation) {
        return ResponseEntity.ok(ApiResponse.success("Add reservation with success.", reservationService.saveReservation(reservation)));
    }

    @PutMapping("/updateReservation")
    public ResponseEntity<ApiResponse> updateReservation(@RequestBody Reservation reservation) {
        if(reservation.getId() == null){
            throw new ResourceNotFoundException("Reservation id is not valid");
        }
        Optional<Reservation> reservationOptional = reservationService.getReservationById(reservation.getId());

        reservationOptional.orElseThrow(()->
                new ResourceNotFoundException("Reservation with id: " + reservation.getId() + " doesn't exist in DB"));

        return ResponseEntity.ok(ApiResponse.success("Update reservation with success.", reservationService.updateReservation(reservation)));
    }

    @DeleteMapping("/deleteReservationById/{id}")
    public ResponseEntity<ApiResponse> deleteReservationById(@PathVariable Long id) {
        Optional<Reservation> reservationOptional = reservationService.getReservationById(id);

        reservationOptional.orElseThrow(() ->
                new ResourceNotFoundException("The reservation with id: " + id + " doesn't exist in DB"));

        reservationService.deleteReservationById(id);

        return ResponseEntity.ok(ApiResponse.success("reservation with id: " + id + " was deleted successfully",null));
    }

    @PostMapping("/confirmReservationById/{id}")
    public ResponseEntity<ApiResponse> confirmReservationById(@PathVariable Long id) {
        Optional<Reservation> reservationOptional = reservationService.getReservationById(id);

        reservationOptional.orElseThrow(() ->
                new ResourceNotFoundException("The reservation with id: " + id + " doesn't exist in DB"));

        Reservation reservation = reservationOptional.get();
        reservation.setPaymentStatus(PaymentStatus.CONFIRMED);

        reservationService.saveReservation(reservation);

        return ResponseEntity.ok(ApiResponse.success("Reservation with id: " + id + " was confirmed successfully",null));
    }

    @PostMapping("/cancelReservationById/{id}")
    public ResponseEntity<ApiResponse> cancelReservationById(@PathVariable Long id) {
        Optional<Reservation> reservationOptional = reservationService.getReservationById(id);

        reservationOptional.orElseThrow(() ->
                new ResourceNotFoundException("The reservation with id: " + id + " doesn't exist in DB"));

        Reservation reservation = reservationOptional.get();
        reservation.setPaymentStatus(PaymentStatus.CANCELED);

        reservationService.saveReservation(reservation);

        return ResponseEntity.ok(ApiResponse.success("Reservation with id: " + id + " was canceled successfully",null));
    }

}
