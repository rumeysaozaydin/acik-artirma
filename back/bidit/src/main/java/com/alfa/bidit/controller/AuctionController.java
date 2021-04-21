package com.alfa.bidit.controller;

import com.alfa.bidit.exception.AuctionNotExistException;
import com.alfa.bidit.exception.UserNotExistException;
import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.AuctionImage;
import com.alfa.bidit.service.AuctionImageService;
import com.alfa.bidit.service.AuctionService;
import com.alfa.bidit.service.ImageService;
import com.alfa.bidit.utils.ApiPaths;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.AuctionControllerPath.auction)
@Api(value = ApiPaths.AuctionControllerPath.auction)
public class AuctionController {
    private final AuctionService auctionService;
    private final ImageService imageService;
    private final AuctionImageService auctionImageService;

    @Autowired
    public AuctionController(AuctionService auctionService, ImageService imageService, AuctionImageService auctionImageService){
        this.auctionService = auctionService;
        this.imageService = imageService;
        this.auctionImageService = auctionImageService;
    }

    @PostMapping
    public ResponseEntity<Auction> create(@RequestBody Auction auction, @RequestParam Long duration, @RequestHeader("Authorization") String token){
        // TODO service return type might also be (id(long), auction(DTO), auction(model), success(boolean))
        Auction newAuction = auctionService.create(auction, duration);
        return ResponseEntity.ok(newAuction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> getById(@PathVariable("id") Long id, @RequestHeader("Authorization") String token) {
        try {
            Auction auction = auctionService.getById(id);
            return ResponseEntity.ok(auction);
        }
        catch (AuctionNotExistException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @GetMapping("/seller/{seller_id}")
    public ResponseEntity<List<Auction>> getBySellerId(@PathVariable("seller_id") Long sellerID, @RequestHeader("Authorization") String token){
        try {
            List<Auction> auctions = auctionService.getBySellerId(sellerID);
            return ResponseEntity.ok(auctions);
        }
        catch (UserNotExistException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @PostMapping("/list")
    public ResponseEntity<List<Auction>> getAllByIdIn(@RequestHeader("Authorization") String token, @RequestBody List<Long> idList){
        System.out.println("[GET AUCTIONS BY LIST REQUEST]:  " + idList);
        List<Auction> auctions = auctionService.getAllByIdIn(idList);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Auction>> getAll(@RequestHeader("Authorization") String token){
        System.out.println("[GET ALL AUCTIONS REQUEST]:  ");
        List<Auction> auctions = auctionService.getAll();
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<Long>> getImageIDs(@PathVariable("id") Long id, @RequestHeader("Authorization") String token){
        System.out.println("[GET ALL AUCTIONS REQUEST]:  ");
        List<Long> images = auctionImageService.getImageIDsByAuctionID(id);
        return ResponseEntity.ok(images);
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<Long> uploadImage(@PathVariable("id") Long id, @RequestParam(value= "image",required = true) MultipartFile multipartImage,  @RequestHeader("Authorization") String token) throws Exception {
        // TODO check needed (whether it is successful)
        Long imageID = imageService.addImage(multipartImage);
        AuctionImage auctionImage = auctionImageService.upload(id, imageID);
        return ResponseEntity.ok(imageID);
    }
}
