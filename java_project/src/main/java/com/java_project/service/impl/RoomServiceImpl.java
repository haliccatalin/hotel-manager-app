package com.java_project.service.impl;


import com.java_project.model.Room;
import com.java_project.repository.RoomRepository;
import com.java_project.service.RoomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Room> readAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoomById(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public Room updateRoom(Room room) {
        return roomRepository.save(room);
    }
}
