document.getElementById("calculate-risk").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll("#data-form input[type='checkbox']");
    let totalRisk = 0;
    let sensitivityCount = { low: 0, medium: 0, high: 0 };

    
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.textContent = "Analyzing...";
    document.body.appendChild(loadingOverlay);
    loadingOverlay.style.display = "flex";

    setTimeout(function() {
        
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                totalRisk += parseInt(checkbox.value);
                sensitivityCount[checkbox.getAttribute("data-sensitivity")]++;
            }
        });

        
        let riskLevel;
        if (totalRisk <= 3) {
            riskLevel = "Low";
        } else if (totalRisk <= 6) {
            riskLevel = "Medium";
        } else {
            riskLevel = "High";
        }

        
        document.getElementById("risk-level").querySelector("span").textContent = riskLevel;

        
        let recommendations = "To secure your data, consider:";
        if (sensitivityCount.high > 0) {
            recommendations += " Avoid sharing highly sensitive data like your address.";
        }
        if (sensitivityCount.medium > 0) {
            recommendations += " Use privacy settings for medium-risk data like your number.";
        }
        if (sensitivityCount.low > 0) {
            recommendations += " Be cautious with low-risk data like your name.";
        }
        document.getElementById("recommendations").querySelector("span").textContent = recommendations;

        
        loadingOverlay.style.display = "none";
    }, 2000); 
});

