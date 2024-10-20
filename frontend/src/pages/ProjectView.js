import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import useFetch from '../useFetch';
import { useParams } from "react-router-dom"

// === Components
import SingleImage from '../components/singleImage';
import Text from '../components/Text';
import Video from '../components/Video';
import Gallery from '../components/Gallery';

    function ProjectView() {    
        const { id } = useParams()
        const { isLoading, error, data } = useFetch(`${process.env.REACT_APP_BACKEND}/api/projects?filters[slug][$eq]=${id}&populate[Components][populate]=*`)

        let project = null;
        let sections = null;
        let display = [];

        console.log('true')
        if (data) {

            project = data.data[0].attributes
            sections = data.data[0].attributes.Components

            console.log(project)

            for (let i = 0; i < sections.length; i ++) {
                if (sections[i].__component === "project-components.single-image") {
                    display.push(<SingleImage data={sections[i]} />)
                } else if (sections[i].__component === "project-components.text") {
                    display.push(<Text data={sections[i]} />)
                } else if (sections[i].__component === "project-components.video") {
                    display.push(<Video data={sections[i]} />)
                } else if (sections[i].__component === "project-components.gallery") {
                    display.push(<Gallery data={sections[i]} />)
                } 
            }

            return (
                <>
                    <div className="page-wrapper">
                        <div className="main-container project-view">
                            <BlocksRenderer content={ project.Title } />
                            <BlocksRenderer content={ project.Description } />
                        </div>
                        <div className="side-container project-view credits">
                            <h1></h1>
                        { project.Credits ? (
                            <BlocksRenderer content={ project.Credits } />
                        ) : ( null) }
                        </div>
                    </div>
                    <div>
                        {display.map((section, index) => 
                            <div key={ index }>
                                { section }
                            </div>
                        )}
                    </div>
                </>
            );
        }
       
    }
    
    export default ProjectView;