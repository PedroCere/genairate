package com.geneairate.blog_content_service.controller;

import com.geneairate.blog_content_service.dto.BlogArticlePatchRequest;
import com.geneairate.blog_content_service.dto.ContentRequest;
import com.geneairate.blog_content_service.dto.ContentResponse;
import com.geneairate.blog_content_service.model.BlogArticle;
import com.geneairate.blog_content_service.service.BlogContentService;
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

    @PostMapping("/generate")
    public ResponseEntity<ContentResponse> generate(@RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.generarContenido(request));
    }

    @PostMapping("/rewrite")
    public ResponseEntity<ContentResponse> rewrite(@RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.reescribirTexto(request));
    }

    @PostMapping("/summarize")
    public ResponseEntity<ContentResponse> summarize(@RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.resumirContenido(request));
    }

    @PostMapping("/correct")
    public ResponseEntity<ContentResponse> correct(@RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.corrigirTexto(request));
    }

    @PostMapping("/translate")
    public ResponseEntity<ContentResponse> translate(@RequestBody ContentRequest request) {
        return ResponseEntity.ok(service.traducirContenido(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Void> save(@RequestBody ContentResponse content) {
        service.guardarArticulo(content);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
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
    public ResponseEntity<Void> patchBlog(@PathVariable Long id, @RequestBody BlogArticlePatchRequest patch) {
        service.partialUpdate(id, patch);
        return ResponseEntity.noContent().build();
    }


}
