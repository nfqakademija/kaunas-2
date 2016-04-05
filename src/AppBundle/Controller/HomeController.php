<?php

namespace AppBundle\Controller;

use AppBundle\Repository\ActivityRepository;
use AppBundle\Repository\OfferRepository;
use AppBundle\Entity\Offer;
use AppBundle\Form\IndexSearchOffer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class HomeController
 * @package AppBundle\Controller
 */
class HomeController extends Controller
{
    /**
     * Login action.
     *
     * @return Response
     */
    public function loginAction()
    {
        return $this->render('AppBundle:Home:login.html.twig', []);
    }

    /**
     * Coaches action.
     *
     * @return Response
     */
    public function coachesAction()
    {
        return $this->render('AppBundle:Home:coaches.html.twig', []);
    }

    /**
     * Home page index action.
     *
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $offer = new Offer();
        $form = $this->createForm(IndexSearchOffer::class, $offer);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            return $this->forward('AppBundle:Home:search');
        }

        /** @var ActivityRepository $activityRepository */
        $activityRepository = $this->getDoctrine()->getRepository('AppBundle:Activity');

        return $this->render('AppBundle:Home:index.html.twig', [
            'form' => $form->createView(),
            'activities' => $activityRepository->getActivityList(),
        ]);
    }

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function searchAction(Request $request)
    {
        /** @var OfferRepository $offerRepository */
        $offerRepository = $this->getDoctrine()->getRepository('AppBundle:Offer');

        return $this->render('AppBundle:Home:search.html.twig', [
            'offers' => $offerRepository->search($request),
        ]);
    }
}
