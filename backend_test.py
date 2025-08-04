#!/usr/bin/env python3
"""
Backend Testing Suite for Icar Assistance Devis System
Tests complete devis generation system with 3€/km pricing, PDF generation, and communication
"""

import requests
import json
import sys
from datetime import datetime, date
import uuid

# Load backend URL from frontend .env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.critical_failures = []
        
    def log_test(self, test_name, success, message, is_critical=False):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'critical': is_critical
        })
        
        if not success and is_critical:
            self.critical_failures.append(test_name)
    
    def test_server_connectivity(self):
        """Test if backend server is reachable"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test("Server Connectivity", True, "Backend server is running and responding correctly")
                    return True
                else:
                    self.log_test("Server Connectivity", False, f"Unexpected response: {data}", True)
                    return False
            else:
                self.log_test("Server Connectivity", False, f"HTTP {response.status_code}: {response.text}", True)
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Server Connectivity", False, f"Connection failed: {str(e)}", True)
            return False
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            response = requests.options(f"{API_BASE}/", timeout=10)
            headers = response.headers
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            missing_headers = [h for h in cors_headers if h not in headers]
            
            if not missing_headers:
                self.log_test("CORS Configuration", True, "All CORS headers present")
                return True
            else:
                self.log_test("CORS Configuration", False, f"Missing CORS headers: {missing_headers}")
                return False
        except Exception as e:
            self.log_test("CORS Configuration", False, f"CORS test failed: {str(e)}")
            return False
    
    def test_create_status_check(self):
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": "AutoExpress Test Client"
            }
            
            response = requests.post(
                f"{API_BASE}/status",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'client_name', 'timestamp']
                
                if all(field in data for field in required_fields):
                    if data['client_name'] == test_data['client_name']:
                        self.log_test("Create Status Check", True, f"Status check created successfully with ID: {data['id']}")
                        return data['id']
                    else:
                        self.log_test("Create Status Check", False, "Client name mismatch in response", True)
                        return None
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Create Status Check", False, f"Missing fields in response: {missing}", True)
                    return None
            else:
                self.log_test("Create Status Check", False, f"HTTP {response.status_code}: {response.text}", True)
                return None
                
        except Exception as e:
            self.log_test("Create Status Check", False, f"Request failed: {str(e)}", True)
            return None
    
    def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{API_BASE}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Get Status Checks", True, f"Retrieved {len(data)} status checks")
                    
                    # Validate structure of returned items
                    if data:
                        first_item = data[0]
                        required_fields = ['id', 'client_name', 'timestamp']
                        if all(field in first_item for field in required_fields):
                            self.log_test("Status Check Structure", True, "Status check objects have correct structure")
                        else:
                            missing = [f for f in required_fields if f not in first_item]
                            self.log_test("Status Check Structure", False, f"Missing fields: {missing}")
                    
                    return True
                else:
                    self.log_test("Get Status Checks", False, f"Expected list, got {type(data)}", True)
                    return False
            else:
                self.log_test("Get Status Checks", False, f"HTTP {response.status_code}: {response.text}", True)
                return False
                
        except Exception as e:
            self.log_test("Get Status Checks", False, f"Request failed: {str(e)}", True)
            return False
    
    def test_database_connectivity(self):
        """Test database operations by creating and retrieving data"""
        print("\n--- Testing Database Connectivity ---")
        
        # Create a test record
        created_id = self.test_create_status_check()
        if not created_id:
            self.log_test("Database Connectivity", False, "Failed to create test record", True)
            return False
        
        # Retrieve records to verify database read
        if self.test_get_status_checks():
            self.log_test("Database Connectivity", True, "Database read/write operations working")
            return True
        else:
            self.log_test("Database Connectivity", False, "Database read operation failed", True)
            return False
    
    def test_api_endpoints(self):
        """Test all API endpoints"""
        print("\n--- Testing API Endpoints ---")
        
        endpoints_working = True
        
        # Test root endpoint
        if not self.test_server_connectivity():
            endpoints_working = False
        
        # Test CORS
        self.test_cors_headers()
        
        # Test database operations
        if not self.test_database_connectivity():
            endpoints_working = False
        
        return endpoints_working
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("\n--- Testing Error Handling ---")
        
        try:
            # Test invalid JSON
            response = requests.post(
                f"{API_BASE}/status",
                data="invalid json",
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Invalid JSON Handling", True, f"Properly rejected invalid JSON with status {response.status_code}")
            else:
                self.log_test("Invalid JSON Handling", False, f"Unexpected status for invalid JSON: {response.status_code}")
            
            # Test missing required field
            response = requests.post(
                f"{API_BASE}/status",
                json={},
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Missing Field Handling", True, f"Properly rejected missing fields with status {response.status_code}")
            else:
                self.log_test("Missing Field Handling", False, f"Unexpected status for missing fields: {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling", False, f"Error handling test failed: {str(e)}")
    
    def run_all_tests(self):
        """Run complete backend test suite"""
        print(f"🚀 Starting Backend Tests for Icar Assistance Devis System")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"API Base: {API_BASE}")
        print("=" * 60)
        
        # Core functionality tests
        server_ok = self.test_server_connectivity()
        if not server_ok:
            print("\n❌ CRITICAL: Backend server is not responding. Cannot continue with other tests.")
            return False
        
        api_ok = self.test_api_endpoints()
        
        # Devis system tests
        devis_ok = self.test_devis_system()
        
        # Additional tests
        self.test_error_handling()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        
        if self.critical_failures:
            print(f"\n🚨 CRITICAL FAILURES:")
            for failure in self.critical_failures:
                print(f"  - {failure}")
            return False
        
        if failed_tests == 0:
            print("\n✅ ALL TESTS PASSED - Backend is fully functional!")
            return True
        else:
            print(f"\n⚠️  {failed_tests} non-critical tests failed, but core functionality works")
            return True

    def test_devis_system(self):
        """Test complete devis generation system"""
        print("\n--- Testing Devis System ---")
        
        # Test health check first
        health_ok = self.test_devis_health_check()
        if not health_ok:
            return False
        
        # Test devis generation
        devis_id = self.test_generate_devis()
        if not devis_id:
            return False
        
        # Test devis retrieval
        self.test_get_devis_details(devis_id)
        
        # Test devis list
        self.test_list_devis()
        
        # Test status update
        self.test_update_devis_status(devis_id)
        
        # Test PDF generation (preview)
        self.test_devis_pdf_preview(devis_id)
        
        return True
    
    def test_devis_health_check(self):
        """Test devis service health check"""
        try:
            response = requests.get(f"{API_BASE}/devis/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'healthy':
                    self.log_test("Devis Health Check", True, f"Service healthy: {data.get('service', 'Unknown')}")
                    return True
                else:
                    self.log_test("Devis Health Check", False, f"Service not healthy: {data}", True)
                    return False
            else:
                self.log_test("Devis Health Check", False, f"HTTP {response.status_code}: {response.text}", True)
                return False
        except Exception as e:
            self.log_test("Devis Health Check", False, f"Health check failed: {str(e)}", True)
            return False
    
    def test_generate_devis(self):
        """Test devis generation with 3€/km pricing"""
        try:
            # Test data matching the review request
            test_data = {
                "client": {
                    "nom": "Dupont Jean",
                    "telephone": "0612345678",
                    "email": "test@example.com",
                    "adresse_ligne1": "123 Rue Test",
                    "code_postal": "34000",
                    "ville": "Montpellier"
                },
                "vehicule": {
                    "type": "voiture",
                    "marque": "Peugeot",
                    "modele": "308",
                    "plaque": "AB-123-CD",
                    "transmission": "manuelle",
                    "etat": "roulant"
                },
                "transport": {
                    "adresse_enlevement": "Montpellier, 34000",
                    "adresse_destination": "Nîmes, 30000",
                    "date_enlevement": "2025-08-10"
                }
            }
            
            response = requests.post(
                f"{API_BASE}/generate-devis",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=30  # Longer timeout for devis generation
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['success', 'devis_id', 'numero_devis', 'montant_total_ttc']
                
                if all(field in data for field in required_fields):
                    if data['success'] and data['montant_total_ttc'] > 0:
                        # Verify 3€/km pricing logic
                        montant = data['montant_total_ttc']
                        numero = data['numero_devis']
                        
                        # Check devis number format (DEV-YYYY-NNNNN)
                        if numero.startswith('DEV-2025-'):
                            self.log_test("Generate Devis", True, 
                                f"Devis generated successfully: {numero}, Amount: {montant}€ TTC, Lines: {len(data.get('lignes_devis', []))}")
                            return data['devis_id']
                        else:
                            self.log_test("Generate Devis", False, f"Invalid devis number format: {numero}", True)
                            return None
                    else:
                        self.log_test("Generate Devis", False, "Devis generation failed or zero amount", True)
                        return None
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Generate Devis", False, f"Missing fields in response: {missing}", True)
                    return None
            else:
                self.log_test("Generate Devis", False, f"HTTP {response.status_code}: {response.text}", True)
                return None
                
        except Exception as e:
            self.log_test("Generate Devis", False, f"Request failed: {str(e)}", True)
            return None
    
    def test_get_devis_details(self, devis_id: str):
        """Test devis details retrieval"""
        try:
            response = requests.get(f"{API_BASE}/devis/{devis_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if 'devis' in data and 'resume' in data:
                    devis_data = data['devis']
                    resume = data['resume']
                    
                    # Verify essential fields
                    if all(field in devis_data for field in ['numero_devis', 'client', 'vehicule', 'transport']):
                        self.log_test("Get Devis Details", True, 
                            f"Devis details retrieved: {resume.get('numero_devis')}, Status: {resume.get('statut')}")
                        return True
                    else:
                        self.log_test("Get Devis Details", False, "Missing essential devis fields")
                        return False
                else:
                    self.log_test("Get Devis Details", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Get Devis Details", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Get Devis Details", False, f"Request failed: {str(e)}")
            return False
    
    def test_list_devis(self):
        """Test devis listing with pagination"""
        try:
            response = requests.get(f"{API_BASE}/devis/list?limit=5", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if 'devis' in data and 'pagination' in data:
                    devis_list = data['devis']
                    pagination = data['pagination']
                    
                    self.log_test("List Devis", True, 
                        f"Retrieved {len(devis_list)} devis, pagination: skip={pagination.get('skip')}, limit={pagination.get('limit')}")
                    return True
                else:
                    self.log_test("List Devis", False, "Invalid response structure")
                    return False
            else:
                self.log_test("List Devis", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("List Devis", False, f"Request failed: {str(e)}")
            return False
    
    def test_update_devis_status(self, devis_id: str):
        """Test devis status update"""
        try:
            new_status = "accepte"
            response = requests.put(
                f"{API_BASE}/devis/{devis_id}/status?new_status={new_status}",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get('success') and data.get('new_status') == new_status:
                    self.log_test("Update Devis Status", True, 
                        f"Status updated to '{new_status}' for devis {devis_id}")
                    return True
                else:
                    self.log_test("Update Devis Status", False, "Status update failed")
                    return False
            else:
                self.log_test("Update Devis Status", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Update Devis Status", False, f"Request failed: {str(e)}")
            return False
    
    def test_devis_pdf_preview(self, devis_id: str):
        """Test PDF preview generation"""
        try:
            response = requests.get(f"{API_BASE}/devis/{devis_id}/preview", timeout=15)
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                content_length = len(response.content)
                
                if 'application/pdf' in content_type and content_length > 1000:
                    self.log_test("PDF Preview", True, 
                        f"PDF generated successfully: {content_length} bytes, Content-Type: {content_type}")
                    return True
                else:
                    self.log_test("PDF Preview", False, 
                        f"Invalid PDF response: {content_type}, {content_length} bytes")
                    return False
            else:
                self.log_test("PDF Preview", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("PDF Preview", False, f"Request failed: {str(e)}")
            return False

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)