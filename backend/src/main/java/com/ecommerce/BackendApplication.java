package com.ecommerce;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public ApplicationRunner initData(ProductRepository productRepository) {
		return args -> {
			if (productRepository.count() == 0) {
				Product p1 = new Product();
				p1.setName("Laptop Pro");
				p1.setDescription("High performance laptop for professionals");
				p1.setPrice(1299.99);
				p1.setImageUrl(
						"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
				p1.setStockQuantity(50);

				Product p2 = new Product();
				p2.setName("Wireless Headphones");
				p2.setDescription("Noise-cancelling wireless headphones");
				p2.setPrice(199.99);
				p2.setImageUrl(
						"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
				p2.setStockQuantity(100);

				Product p3 = new Product();
				p3.setName("Smart Watch");
				p3.setDescription("Fitness tracking smart watch with heart rate monitor");
				p3.setPrice(249.99);
				p3.setImageUrl(
						"https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
				p3.setStockQuantity(75);

				productRepository.save(p1);
				productRepository.save(p2);
				productRepository.save(p3);
			}
		};
	}
}
