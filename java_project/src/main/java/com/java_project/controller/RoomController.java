package com.java_project.controller;


import com.java_project.exception.ResourceNotFoundException;
import com.java_project.model.Room;
import com.java_project.service.RoomService;
import com.java_project.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllRooms() {
        List<Room> roomsList = roomService.readAllRooms();

        return ResponseEntity.ok(ApiResponse.success("All rooms list", roomsList));
    }

    @GetMapping("/roomById/{id}")
    public ResponseEntity<ApiResponse> getRoomById(@PathVariable Long id) {
        Optional<Room> roomById = roomService.getRoomById(id);
        roomById.orElseThrow(() ->
                new ResourceNotFoundException("Room with id: " + id + " doesn't exist in DB"));
        return ResponseEntity.ok(ApiResponse.success("Room by id",roomById.get()));
    }

    @PostMapping("/addNewRoom")
    public ResponseEntity<ApiResponse> saveRoom(@RequestBody Room room) {
        Room newRoom = roomService.saveRoom(room);

        return ResponseEntity.ok(ApiResponse.success("Add new room", newRoom));
    }

    @PutMapping("/updateRoom")
    public ResponseEntity<ApiResponse> updateRoom(@RequestBody Room room) {
        if(room.getId() == null){
            throw new ResourceNotFoundException("Room id is not valid");
        }
        Optional<Room> roomOptional = roomService.getRoomById(room.getId());
        roomOptional.orElseThrow(()->
                new ResourceNotFoundException("Room with id: " + room.getId() + " doesn't exist in DB"));

        return ResponseEntity.ok(ApiResponse.success("Update room", roomService.updateRoom(room)));
    }

    @DeleteMapping("/deleteRoom/{id}")
    public ResponseEntity<ApiResponse> deleteRoom(@PathVariable Long id) {
        Optional<Room> rooomOptional = roomService.getRoomById(id);

        rooomOptional.orElseThrow(() ->
                new ResourceNotFoundException("Room with id: " + id + " doesn't exist in DB"));

        roomService.deleteRoomById(id);

        return ResponseEntity.ok(ApiResponse.success("Delete room",null)); // varianta 2
    }

}
