package com.IDE.IDE.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IDE.IDE.model.CodeHistory;
import com.IDE.IDE.repository.CodeHistoryRepository;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CodeExecutionController {
    
    private final CodeHistoryRepository codeHistoryRepository;

    public CodeExecutionController(CodeHistoryRepository codeHistoryRepository) {
        this.codeHistoryRepository = codeHistoryRepository;
    }

    @PostMapping("/execute")
    public String executeCode(@RequestBody CodeRequest request) {
        try {
            String code = request.getCode();

            if(codeHistoryRepository.existsByCode(code)){
                return "Duplicate code already exists in the database!";
            }

            File file = new File("Main.java");
            FileWriter writer = new FileWriter(file);
            writer.write(code);
            writer.close();

            Process compileProcess = Runtime.getRuntime().exec("javac Main.java");
            compileProcess.waitFor();

            Process runProcess = Runtime.getRuntime().exec("java Main");
            BufferedReader br = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                output.append(line).append("\n");
            }
            runProcess.waitFor();

            // ✅ Saving to Database
            CodeHistory history = new CodeHistory(code, output.toString(), LocalDateTime.now());
            codeHistoryRepository.save(history);

            return output.toString();
        } catch (Exception e) {
            return "Error During Execution: " + e.getMessage();
        }
    }

    @GetMapping("/history")
    public List<CodeHistory> getCodeHistory() {
        return codeHistoryRepository.findTop5ByOrderByTimestampDesc();
    }

    public static class CodeRequest {
        private String code;
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }
}
