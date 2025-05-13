package com.geneairate.blog_content_service.controller;

import com.geneairate.blog_content_service.dto.*;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.service.BlogContentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/content")
public class BlogContentController {

    private final BlogContentService service;

    public BlogContentController(BlogContentService blogContentService) {
        this.service = blogContentService;
    }

    @GetMapping("/user/{userId}/blogs")
    public ResponseEntity<List<ContentResponse>> getBlogsByUser(@PathVariable Long userId) {
        List<ContentResponse> blogs = service.getByUserId(userId);
        return ResponseEntity.ok(blogs);
    }

    @PostMapping("/generate")
    public ResponseEntity<ContentResponse> generate(@RequestBody ContentRequest request) {
        System.out.println("Received JSON for generate: " + request);
        return ResponseEntity.ok(service.generarContenido(request));
    }

    @PutMapping("/rewrite")
    public ResponseEntity<ContentResponse> rewrite(@Valid @RequestBody ModifyContentRequest request) {
        return ResponseEntity.ok(service.reescribirTexto(request));
    }

    @PostMapping("/summarize")
    public ResponseEntity<ContentResponse> summarize(@Valid @RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.resumirContenido(request));
    }

    @PostMapping("/correct")
    public ResponseEntity<ContentResponse> correct(@Valid @RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.corrigirTexto(request));
    }

    @PutMapping("/translate")
    public ResponseEntity<ContentResponse> traducir(@RequestBody TranslateRequest request) {
        return ResponseEntity.ok(service.traducirContenido(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentResponse> getById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Void> save(@Valid @RequestBody ContentResponse content) {
        service.guardarArticulo(content);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@Valid @PathVariable Long id) {
        service.eliminarPorId(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ContentResponse>> recent() {
        return ResponseEntity.ok(service.obtenerRecientes());
    }


    @GetMapping("/all")
    public ResponseEntity<List<ContentResponse>> getAllBlogs(){
        List<ContentResponse> blogs = service.getAll();
        return ResponseEntity.ok(blogs);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> patchBlog(@Valid @PathVariable Long id, @RequestBody BlogArticlePatchRequest patch) {
        service.partialUpdate(id, patch);
        return ResponseEntity.noContent().build();
    }


}
