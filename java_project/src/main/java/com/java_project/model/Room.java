package com.java_project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "room_name", nullable = false)
    private String name;
    @Column(name = "room_description", columnDefinition = "text", nullable = false)
    private String description;
    @Column(name = "room_price", nullable = false)
    private double price;
    @Column(name = "room_image_1")
    private String image1;
    @Column(name = "room_image_2")
    private String image2;
    @Column(name = "room_image_3")
    private String image3;
    @Column(name = "room_image_4")
    private String image4;
    @Column(name = "room_category")
    @Enumerated(value = EnumType.STRING)
    private RoomType roomType;

    @ManyToMany(mappedBy = "roomList", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("roomList")
    private List<Reservation> reservationList;


}
