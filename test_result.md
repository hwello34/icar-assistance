#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Integrate social media links (Instagram, Facebook, Snapchat) into the AutoExpress website"

frontend:
  - task: "Integrate social media links in footer"
    implemented: true
    working: true
    file: "/app/frontend/src/components/HomePage.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Successfully integrated social media links for Instagram (https://www.instagram.com/autoexpres34/), Facebook (https://www.facebook.com/profile.php?id=61578160629390), and Snapchat (https://www.snapchat.com/add/hwello07?share_id=mPCR4xFWHWE&locale=fr-FR) in the footer section. Added appropriate icons (Instagram, Facebook from lucide-react, and custom SVG for Snapchat), styled with brand colors, and added multi-language support for all 6 languages. Links open in new tabs with proper security attributes."

backend:
  - task: "Backend functionality check"
    implemented: true
    working: true
    file: "backend services"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "No backend changes required for social media integration. Need to verify backend services are still functioning correctly."
      - working: true
        agent: "testing"
        comment: "Backend testing completed successfully. All core functionality verified: ✅ Server connectivity (FastAPI running on correct URL), ✅ Database operations (MongoDB CRUD working), ✅ API endpoints (/api/, /api/status GET/POST), ✅ Error handling (422 for invalid requests), ✅ All supervisor services running. Minor: CORS headers missing from OPTIONS requests but not affecting functionality. Created backend_test.py for comprehensive testing."
      - working: true
        agent: "testing"
        comment: "Post-social media integration verification completed. Backend stability confirmed: ✅ All supervisor services running (backend, frontend, mongodb, code-server), ✅ API endpoints responding correctly (/api/ returns Hello World, /api/status CRUD operations working), ✅ Database connectivity maintained (MongoDB read/write operations successful), ✅ Error handling intact (422 for invalid requests). Social media integration had no impact on backend functionality."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus:
    - "Integrate social media links in footer"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Completed social media integration task. Added Instagram, Facebook, and Snapchat links to the footer with proper styling, animations, and multi-language support. All social media links are properly configured to open in new tabs with security attributes. Ready for testing."
  - agent: "testing"
    message: "Backend stability verification completed after social media integration. All backend services and functionality confirmed working correctly. No backend changes were required for the social media integration, and existing functionality remains intact. Backend testing shows: ✅ All supervisor services running, ✅ API endpoints responding, ✅ Database operations working, ✅ Error handling intact. The social media integration was purely frontend-based and had no negative impact on backend stability."