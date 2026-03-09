package com.ecommerce.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String customerName;
    private String customerEmail;
    private String customerAddress;
    private List<OrderItemRequest> items;
}
