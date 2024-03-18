package com.java_project.service;

import com.java_project.model.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    List<Room> readAllRooms();

    Optional<Room> getRoomById(Long id);

    Room saveRoom(Room room);

    void deleteRoomById(Long id);

    Room updateRoom(Room room);
}
