import Navbar from "@/components/Navbar";

export default function ReflectionPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Reflection & Discussion</h1>
          
          <div className="prose prose-slate max-w-none">
            
            <h3 className="text-xl font-bold text-slate-800">Learning from the Design Process</h3>
            <p>
              Through the iterative design process, we learned that simply providing accurate data is not enough if the presentation of our product lacks clarity and transparency. In our early concepts, we assumed that displaying a correct risk score would be sufficient for the tool to be useful for our target demographic. However, our testing and interviews revealed that users did not trust algorithms that simply functioned as black boxes without revealing the steps to arrive at the score. When participants saw a risk score without context, they felt confused and sceptical rather than assisted. This realization drove us to shift our focus from simple data entry to visual communication. We prioritized features like the heat map and the performance matrix over raw numbers because effective AI tools must explain the reasoning behind a decision to build user trust. We also learned the value of feasibility when trying to translate our paper prototype to the digital mock-up, as sketching the human hand visualization revealed it was too cluttered before we wasted time trying to write code to render it.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8">From Paper to Digital: Key Transitions</h3>
            <p>
              The transition from the paper prototype to the digital mock-up was heavily influenced by specific incidents observed during usability testing. Initially, we treated the interface like a standard web page where information is stacked vertically. Watching our first participant struggle to scroll back and forth between the controls and the results was a turning point for our layout strategy. This observation forced us to abandon the scrolling webpage structure and adopt a fixed, single page layout where controls are anchored at the bottom of the screen without the need to scroll and further navigation which can break focus. Furthermore, the feedback regarding the invisible system status directly shaped the inclusion of the loading screens and progress bars. Without these iterative tests, our final digital product would likely have been a static form that failed to meet basic usability standards.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8">Evolution of User Tasks</h3>
            <p>
              While our two primary goals of identifying risk and refining design remained consistent, the nature of how users performed these tasks evolved. Initially, the refinement task required users to manually guess the correct diameter to input. During testing, we observed users hesitating because they were unsure of which values would satisfy the ergonomic requirements. As a result, we shifted the task from manual refinement to AI-assisted refinement. We introduced specific application buttons for the AI recommendations. This changed the user&apos;s role from a calculator who inputs numbers to a decision maker who validates the suggestions provided by the system.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8">Reflecting on Iterations</h3>
            <p>
              Reflecting on the timeline, we believe the project would have benefitted from more iterations, specifically an intermediate stage between the paper sketches and the final code. We moved directly from pencil sketches to a fully coded application. This gap meant that some significant design decisions, such as the pivot from the 3D human model to the radar chart, had to be made during the coding phase. This was technically difficult and consumed time that could have been spent on testing. An intermediate wireframing stage would have allowed us to test the chart concept visually before committing to the code logic. However, fewer iterations would not have been viable because removing the paper prototyping phase would have resulted in us building the flawed vertical layout in the final product.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}